import crawledPageReducer, {
  saveDataToState
} from '../store/reducers/crawledPageReducer';
const state = {

};
test('should return the initial state', () => {
  expect(crawledPageReducer(undefined, {})).toEqual({});
});

test('should save data to redux state', () => {
  const mockData = {
    'data': [
      {
        'links': [
          {
            'href': '/allactivity?privacy_source=activity_log_top_menu'
          }
        ],
        '_id': '628d171c82df3368cfd17c77',
        'url': 'facebook.com',
        'title': 'Facebook - log in or sign up',
        'metaDescription': 'No meta description for this page',
        'h1': 'No h1 text for this page',
        'h2': 'Connect with friends and the world around you on Facebook.',
        'creationDate': '2022-05-24T17:34:20.573Z',
        'updateDate': '2022-05-24T17:34:20.573Z',
        '__v': 0
      }
    ],
    'totalPages': 1,
    'currentPage': 1
  };
  const result = crawledPageReducer(state, saveDataToState(mockData));
  expect(result).toEqual(mockData);
});
