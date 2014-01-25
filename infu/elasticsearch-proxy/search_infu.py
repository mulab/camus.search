# coding=utf-8
__author__ = 'moony'
import pyes

conn = pyes.ES()

#for highlighting please check page
# https://pyes.readthedocs.org/en/latest/guide/reference/api/search/highlighting.html
q = pyes.Search(pyes.StringQuery(u'桃李'), start=0, size=20)
q.add_highlight('info.title')
#q.add_highlight('comm.comments.body')
#TODO: we should put each comment/reply as sub-document according to
# http://stackoverflow.com/questions/15230580/elasticsearch-highlight-with-nested-objects
results = conn.search(q, indices='qa', doc_types='infu')

q1 = pyes.Search(pyes.StringQuery(u'桃李'), start=0, size=20, sort={'id': {'order': 'asc'}})

cnt = 0
for r in results:
    cnt += 1
print cnt

print results.total
cnt = 0
for r in results:
    if r.comm.commentCount is not 0:
        print r._meta
        print r.info.title
        print r.info.largeUrl
        print r.info.time
        for comment in r.comm.comments:
            print comment.body
        print r.comm.commentCount, cnt
    cnt += 1
    if cnt == 20:
        break
