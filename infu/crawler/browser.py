#-*-coding:utf-8-*-
__author__ = 'moony'

import json
import os
import re
import random
import urllib

import requests

from encrypt import encryptString


class renrenBrowser:
    def __init__(self, email=None, password=None):
        self.usr = email
        self.pwd = password
        self.session = requests.Session()
        self.session.headers.update({'User-agent':
                                     'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:16.0) Gecko/20100101 Firefox/16.0'})
        self.token = {}
        if email and password:
            self.plogin(email, password)
            #self.login(email, password)

    def _request_(self, url, method, data={}, params={}):
        if data:
            data.update(self.token)
        if method == 'get':
            return self.session.get(url, data=data, params=params)
        elif method == 'post':
            return self.session.post(url, data=data, params=params)

    def get(self, url, data={}, params={}):
        return self._request_(url=url, method='get', data=data, params=params)

    def post(self, url, data={}, params={}):
        return self._request_(url=url, method='post', data=data, params=params)

    def login(self, email, pwd):
        key = self.getEncryptKey()

        if self.getShowCaptcha(email) == 1:
            fn = 'icode.%s.jpg' % os.getpid()
            self.getICode(fn)
            print "Please input the code in file '%s':" % fn
            icode = raw_input().strip()
            os.remove(fn)
        else:
            icode = ''

        data = {
            'email': email,
            'origURL': 'http://www.renren.com/home',
            'icode': icode,
            'domain': 'renren.com',
            'key_id': 1,
            'captcha_type': 'web_login',
            'password': encryptString(key['e'], key['n'], pwd) if key['isEncrypt'] else pwd,
            'rkey': key['rkey']
        }
        print "login data: %s" % data

        url = 'http://www.renren.com/ajaxLogin/login?1=1&uniqueTimestamp=%f' % random.random()
        r = self.post(url, data)
        result = r.json()
        if result['code']:
            print 'login successfully'
            self.email = email
            r = self.get(result['homeUrl'])
            self.getToken(r.text)
        else:
            print 'login error', r.text

    def loginByCookie(self, cookie_path):
        with open(cookie_path) as fp:
            cookie_str = fp.read()

        cookie_dict = dict([v.split('=', 1) for v in cookie_str.strip().split(';')])
        self.session.cookies = requests.utils.cookiejar_from_dict(cookie_dict)
        self.getToken()

    def saveCookie(self, cookie_path):
        with open(cookie_path, 'w') as fp:
            cookie_dict = requests.utils.dict_from_cookiejar(self.session.cookies)
            cookie_str = '; '.join([k + '=' + v for k, v in cookie_dict.iteritems()])
            fp.write(cookie_str)

    def getICode(self, fn):
        r = self.get("http://icode.renren.com/getcode.do?t=web_login&rnd=%s" % random.random())
        if r.status_code == 200 and r.raw.headers['content-type'] == 'image/jpeg':
            with open(fn, 'wb') as f:
                for chunk in r.iter_content():
                    f.write(chunk)
        else:
            print "get icode failure"

    def getShowCaptcha(self, email=None):
        r = self.post('http://www.renren.com/ajax/ShowCaptcha', data={'email': email})
        return r.json()

    def getEncryptKey(self):
        r = requests.get('http://login.renren.com/ajax/getEncryptKey')
        return r.json()

    def getToken(self, html=''):
        p = re.compile("get_check:'(.*)',get_check_x:'(.*)',env")

        if not html:
            r = self.get('http://www.renren.com')
            html = r.text

        result = p.search(html)
        self.token = {
            'requestToken': result.group(1),
            '_rtk': result.group(2)
        }

    def plogin(self, email, pwd):
        data = {
            'email': email,
            'password': pwd,
            #'origURL': '',
            #'formName': '',
            #'method': '',
            'isplogin': 'true',
            'submit': '登录'
        }
        url = 'http://www.renren.com/PLogin.do'
        resp = self.post(url=url, data=data)
        f = open('home.html', 'w')
        f.write(resp.text.encode('utf-8'))
        #TODO: the following check is wrong at the moment :(
        if self._findInfoWhenLogin(resp.text):
            print 'Plogin success.'
        else:
            print 'Plogin failed.'

    def _findInfoWhenLogin(self, rawHTML):
        # find user id
        uidPattern = re.compile(r"""'id':'(\d+?)'""")
        try:
            self.uid = uidPattern.search(rawHTML).group(1)
        except:
            return False

        # find requestToken
        pos = rawHTML.find("get_check:'")
        if pos == -1:
            return False
        rawHTML = rawHTML[pos + 11:]
        token = re.match('-\d+', rawHTML)
        if token is None:
            token = re.match('\d+', rawHTML)
            if token is None:
                return False
        self.requestToken = token.group()

        # find _rtk
        pos = rawHTML.find("get_check_x:'")
        if pos == -1:
            return False
        self._rtk = rawHTML[pos + 13:pos + 13 + 8]

        print 'Login renren.com successfully.'
        print "userid: %s, token: %s, rtk: %s" % (self.userid, self.requestToken, self._rtk)

        self.__isLogin = True
        return self.__isLogin


class albumBrowser(renrenBrowser):
    storePath = 'data/'
    albumListHTML = storePath + 'albums.html'

    def albumList(self, rid='386451741', update=False):
        print 'Retrieving album list of ' + rid
        # to know the basic infomation about all the albums of {rid}
        html = None
        if not update:
            print ' Retieving from file...'
            try:
                html = ('\n'.join(open(self.albumListHTML).readlines())).decode('utf-8')
            except:
                html = None
            #print html

        if html is None:
            print ' Dowloading...'
            url = 'http://photo.renren.com/photo/{rid}/album/relatives'.format(rid=rid)
            resp = self.get(url)
            html = resp.text
            open(self.albumListHTML, 'w').write(html.encode('utf-8'))

        print 'Retrieve finished.'
        return self._getAlbumsFromHTML(html)

    def _getAlbumsFromHTML(self, rawHtml):
        """
        parse out the album names and aids
        return a list of tuple (name, aid)
        """
        albumUrlPattern = \
            re.compile(
                r'''<a href="http://photo.renren.com/photo/(\d+?)/album-(\d+?)\?frommyphoto" class="album-title">.*?<span class="album-name">(.*?)</span>''',
                re.DOTALL)

        albums = []
        for rid, aid, album_name in albumUrlPattern.findall(rawHtml):
            album_name = album_name.strip()
            if album_name == '<span class="userhead">':
                album_name = u"头像相册"
            elif album_name == '<span class="phone">':
                album_name = u"手机相册"
            elif album_name == '<span class="password">': # skip the albums which have password
                continue
            albums.append((album_name, aid))

        return albums

    def downloadAlbum(self, dir, rid='386451741', aid='871712702', update=False):
        if raw_input('Update album http://photo.renren.com/photo/{rid}/album-{aid} ? (y/n):'.format(rid=rid, aid=aid)) == 'n':
            return
        print 'Start download album ' + dir
        # get a json response of {pagenum} pages (have 20 photo info per page, start at {curPage} which is usually 0)
        # the ablum {aid} of user {rid}
        jsonFileName = dir + '/photos.json'
        photos = None
        if update or not os.path.exists(jsonFileName):
            # modify the pagenum parameter
            # if there is album which contains more than 100 photos
            url = 'http://photo.renren.com/photo/{rid}/album-{aid}/bypage/ajax?curPage=0&pagenum=200'.format(
                rid=rid,
                aid=aid
            )  # no more than 2000 photos per album
            resp = self.get(url)
            #print resp
            photos = resp.json()
            photoNum = photos["photoList"][0]["position"]
            if photoNum > 200:
                for page in range(photoNum/200):
                    url1 = 'http://photo.renren.com/photo/{rid}/album-{aid}/bypage/ajax?curPage={page}&pagenum=200'.format(
                        rid=rid,
                        aid=aid,
                        page=page+1
                    )
                    #print url1
                    photosPerPage=self.get(url1).json()
                    #print photosPerPage["photoList"][0]["position"]
                    photos["photoList"].extend(photosPerPage["photoList"])
            #print photoNum
            #print len(photos["photoList"])
            json.dump(photos, open(dir + '/photos.json', 'w'), encoding='utf-8')
        else:
            photos = json.load(open(dir + '/photos.json'), encoding='utf-8')
        print 'There are {} photos.'.format(len(photos['photoList']))

        for photo in photos['photoList']:
            purl = photo['largeUrl']
            pid = photo['photoId']
            pcnt = photo['positionSaved']
            formatName = u'{}/{}_{}'.format(dir, pcnt, pid)
            filename = formatName + '.jpg'
            # get the image, only the ones that not exist locally
            if not os.path.exists(filename):
                self._downloadImage(purl, filename)
                # use http://photo.renren.com/photo/{rid}/photo-{pid} to visit photo {pid} of user {rid}
            # get a json response listing all comments of the photo {pid} of user {rid}
            photoJ = formatName + '.info.json'
            commentJ = formatName + '.comm.json'
            #TODO: check commentCount to decide whether to update
            if update or not os.path.exists(photoJ) or not os.path.exists(commentJ):
                json.dump(photo, open(photoJ, 'w'), encoding='utf-8')
                url = 'http://photo.renren.com/photo/{rid}/photo-{pid}/comment'.format(rid=rid, pid=pid)
                json.dump(self.get(url).json(), open(commentJ, 'w'), encoding='utf-8')

    @classmethod
    def _downloadImage(cls, img_url, filename, retry_limit=5):
        print 'Dowloading ' + filename
        count = 0
        # Retry until we get the right picture.
        while True:
            try:
                count += 1
                if count > retry_limit:
                    print "Too many times retry."
                    break
                n, msg = urllib.urlretrieve(img_url, filename)
                print n, str(msg.type)
                if "image" in msg.type:
                    break
            except:
                print "Failed downloading %s." % filename

    def downloadAlbums(self, rid='386451741', update=False):
        for aname, aid in self.albumList(rid=rid, update=update):
            dir = self.storePath + aname.strip() + ' (' + aid + ')'
            if os.path.exists(dir):
                self.downloadAlbum(dir, rid=rid, aid=aid, update=update)
            else:
                os.mkdir(dir)
                self.downloadAlbum(dir, rid=rid, aid=aid, update=True)
