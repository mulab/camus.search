# coding=utf-8
__author__ = 'guangchen'
import re


class EsParse:
    def __init__(self, es_result=None):
        if es_result is None:
            es_result = []
        result = []
        index = 0
        for item in es_result:
            parse_item = self.__parse(item)
            parse_item['resultIndex'] = index
            result.append(parse_item)
            index += 1
        self.result = result

    # noinspection PyProtectedMember
    def __parse(self, item):
        item_type = item._meta.type
        if item_type == u'infu':
            return InfuResult(item).result
        elif item_type in [u'artschool', u'learnfaq', u'lib']:
            return CommonResult(item).result
        elif item_type == u'career':
            return Career(item).result
        elif item_type == u'chemschool':
            return Chemschool(item).result
        elif item_type == u'lib_author':
            return LibAuthor(item).result
        elif item_type == u'myhome':
            return MyHome(item).result
        elif item_type == u'tunet':
            return Tunet(item).result
        return {}


class Tunet():
    def __init__(self, es_item):
        self.result = {}
        self.result.update({
            'type': u'tunet',
            'question': es_item.question,
            'answer': es_item.answer,
            'link': es_item.link,
            'date': es_item.date,
        })


class MyHome():
    def __init__(self, es_item):
        self.result = {}
        self.result.update({
            'type': u'myhome',
            'question': es_item.question,
            'answer': es_item.answer,
            'link': es_item.link,
            'title': es_item.title,
        })


class LibAuthor():
    def __init__(self, es_item):
        self.result = {}
        self.result.update({
            'type': u'libauthor',
            'question': es_item.question,
            'date': es_item.date,
            'answer': es_item.answer,
            'link': es_item.link,
            'title': es_item.title,
            'reDate': es_item.reDate,
        })


class CommonResult():
    # noinspection PyProtectedMember
    def __init__(self, es_item):
        self.result = {}
        self.result.update({
            'type': es_item._meta.type,
            'question': es_item.question,
            'answer': es_item.answer,
            'link': es_item.link,
        })


class Chemschool():
    def __init__(self, es_item):
        self.result = {}
        self.result.update({
            'type': u'chemschool',
            'question': es_item.question,
            'date': es_item.date,
            'answer': es_item.answer,
            'link': es_item.link,
            'title': es_item.title,
            'exactDate': es_item.exactDate,
        })


class Career():
    def __init__(self, es_item):
        self.result = {}
        self.result.update({
            'type': u'career',
            'question': es_item.question,
            'answer': es_item.answer,
            'link': es_item.link,
            'title': es_item.title,
        })


class InfuResult():
    # noinspection PyProtectedMember
    def __init__(self, r):
        self.result = {}
        comment_list = []
        for com in r.comm.comments:
            comment_list.append(
                {
                    'body': com.body,
                    'name': com.name,
                    'time': com.time
                }
            )
        title = r.info.title
        if 'highlight' in r._meta:
            title = r._meta['highlight']['info.title'][0]
        author_and_id = self.get_author_and_id(title)
        author = ""
        author_id = ""
        if author_and_id != "":
            title = self.get_title(title)
            author = self.get_author(author_and_id)
            author_id = self.get_author_id(author_and_id)
        self.result.update({
            # 'meta': r._meta,
            'title': title,
            'author': author,
            'authorId': author_id,
            'largeUrl': r.info.largeUrl,
            'time': r.info.time,
            'commentCount': r.comm.commentCount,
            'commentList': comment_list,
            'photoId': r.info.photoId,
            'type': u'infu'
        })

    def get_title(self, title):
        return self.get_re_match(title, ur'@.*?问:(.*$)', re.DOTALL)

    def get_re_match(self, source, reg, flag=0):
        r = re.compile(reg, flag)
        obj = r.match(source)
        if obj is not None:
            return obj.group(1)
        return ""

    def get_author_and_id(self, title):
        return self.get_re_match(title, ur'@(.*?)问:')

    def get_author_id(self, author_and_id):
        return self.get_re_match(author_and_id, ur'.*\(([0-9]*?)\s*\)\s*$')

    def get_author(self, author_and_id):
        return self.get_re_match(author_and_id, ur'(.*)\([0-9]*?\s*\)\s*$')