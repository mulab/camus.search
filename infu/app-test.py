__author__ = 'guangchen'

import unittest
import json as jsonlib
from app import app


class AppTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['es_url'] = 'http://www.lab.mu:9200/'
        self.app = app.test_client()

    def tearDown(self):
        pass

    def test_query_without_params(self):
        response = self.app.get('/query')
        data = response.data
        result = jsonlib.loads(data)
        assert len(result['result']) == 10
        item = result['result'][0]
        assert u'resultIndex' in item
        assert u'type' in item

    def test_query_with_keywords(self):
        response = self.app.get('/query?keywords=a')
        data = response.data
        result = jsonlib.loads(data)
        assert len(result['result']) == 10
        item = result['result'][0]
        assert u'a' in item['question'] or u'a' in item['answer'] or u'a' in item['title']

    def test_query_with_size(self):
        response = self.app.get('/query?size=15')
        result = jsonlib.loads(response.data)
        assert len(result['result']) == 15

    def test_query_with_type(self):
        response = self.app.get('/query?type=["tunet"]')
        result = jsonlib.loads(response.data)
        item = result['result'][0]
        assert u'tunet' == item['type']

    def test_query_with_start(self):
        response = self.app.get('/query')
        origin_result = jsonlib.loads(response.data)
        response = self.app.get('/query?start=1')
        offset_result = jsonlib.loads(response.data)
        origin_item = origin_result['result'][1]
        offset_item = offset_result['result'][0]
        assert origin_item['type'] == offset_item['type']
        if origin_item['type'] == u'infu':
            assert origin_item['title'] == offset_item['title']
        else:
            assert offset_item['link'] == offset_item['link']

    def test_query_by_post(self):
        headers = [('Content-Type', 'application/json')]
        result = jsonlib.loads(self.app.post('/query', {}).data)
        assert len(result['result']) == 10
        item = result['result'][0]
        assert u'resultIndex' in item
        assert u'type' in item
        data = dict(keywords=u'a', size=15, start=0, type=[u'lib'])
        # json_data = jsonlib.dumps(data)
        # json_data_length = len(json_data)
        # headers.append(('Content-Length', json_data_length))
        data = self.app.post('/query', headers=headers, data=jsonlib.dumps(data)).data
        origin_result = jsonlib.loads(data)
        offset_result = jsonlib.loads(data)
        assert len(origin_result['result']) == 15
        origin_item = origin_result['result'][1]
        offset_item = offset_result['result'][0]
        assert offset_item['type'] == origin_item['type'] == u'lib'
        assert offset_item['link'] == offset_item['link']



if __name__ == '__main__':
    unittest.main()
