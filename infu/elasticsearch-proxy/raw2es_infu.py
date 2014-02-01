# coding=utf-8
__author__ = 'moony'
import json
import os
import pyes
import re

conn = pyes.ES()  # Defaults to connecting to the server at '127.0.0.1:9500'

index = 'qa'  # this index is for QA app
doc_type = 'infu'  # document type is infu

#conn.indices.delete_index_if_exists(index)  # delete this line of code when choose update rather than new
conn.indices.create_index_if_missing(index)

mapping = json.load(open('mapping_infu.json'), encoding='utf-8')
conn.indices.put_mapping(doc_type=doc_type, mapping=mapping, indices=[index])

path = u'../crawler/data/'
reDIR = re.compile(ur'.*/\d{4}-\d{2} 提问 \((\d+)\).*')  # e.g. "data/2012-01 提问 (563247699)/"
reInfo = re.compile(r'(\w+).info.json')
for (dirpath, dirnames, filenames) in os.walk(path):
    objDIR = reDIR.match(dirpath)
    if objDIR is not None:
        dirID = objDIR.group(1)
        for filename in filenames:
            objInfo = reInfo.match(filename)
            if objInfo is not None:
                pid = objInfo.group(1)
                #print dirpath, pid
                info = json.load(open(dirpath + '/' + pid + '.info.json'), encoding='utf-8')
                comm = json.load(open(dirpath + '/' + pid + '.comm.json'), encoding='utf-8')
                whole = {'info': info, 'comm': comm}
                #print index, type, dirID + '_' + pid
                if not conn.exists(index=index, doc_type=doc_type, id=dirID + '_' + pid):
                    conn.index(whole, index=index, doc_type=doc_type, id=dirID + '_' + pid)
                else:
                    conn.update(document=whole, index=index, doc_type=doc_type, id=dirID + '_' + pid)

conn.indices.optimize(indices=['qa'])
conn.indices.refresh()
