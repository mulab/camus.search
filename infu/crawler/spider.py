__author__ = 'moony'
import sys

from browser import albumBrowser

if __name__ == '__main__':
    # input parameter
    # - login method (pLogin/loginByCookie/webLogin)
    # currently only webLogin works well
    if len(sys.argv) == 2:
        if sys.argv[1] == 'loginByCookie':
            rr = albumBrowser()
            rr.loginByCookie(input("input your cookie file name:"))
        elif sys.argv[1] == 'webLogin':
            rr = albumBrowser()
            rr.login(
                raw_input("input your email: "),
                raw_input("input your password: ")
            )
        elif sys.argv[1] == 'pLogin':
            rr = albumBrowser()
            rr.plogin(
                raw_input("input your email: "),
                raw_input("input your password: ")
            )
        rr.downloadAlbums(update=True)
    else:
        print 'Please use command "python spider.py pLogin|loginByCookie|webLogin"'
