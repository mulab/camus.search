from flask import jsonify, request, render_template
import pyes
import esparse
import json as jsonlib
from app import app

__size__ = 10
__es_url__ = '127.0.0.1:9200'

@app.route('/')
def index():
    return render_template('index.html', app=app)


def get_query_params_from(req):
    if req.method == 'POST' and req.data != '':
        args = jsonlib.loads(req.data)
    else:
        args = req.args
    keywords = args.get('keywords') or '*'
    try:
        doctype = jsonlib.loads(args.get('type'))
    except TypeError:
        doctype = args.get('type') or []
    try:
        start_index = int(args.get('start'))
    except (ValueError, TypeError):
        start_index = 0
    try:
        page_size = int(args.get('size'))
    except (ValueError, TypeError):
        page_size = __size__
    return keywords, doctype, start_index, page_size


@app.route('/query', methods=['POST', 'GET'])
def query():
    keyword, doctype, start_index, page_size = get_query_params_from(request)
    es_url = app.config.get('es_url') or __es_url__
    conn = pyes.ES(es_url)
    q = pyes.Search(pyes.StringQuery(keyword), None, None, start_index, size=page_size)
    q.add_highlight('info.title')
    es_result = conn.search(q, indices='qa', doc_types=doctype)
    result = esparse.EsParse(es_result).result
    return jsonify(result=result, count=es_result.total, start=start_index, size=page_size)