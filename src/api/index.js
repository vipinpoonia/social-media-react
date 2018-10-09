import request from 'superagent';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again';

const baseResponseHandler = (err, res, reject, successCallBack) => {
  if (err) {
    if (err.status && res && res.body && res.body.message) {
      reject({ message: res.body.message });
      return;
    }
    if (err.status) {
      reject({ message: DEFAULT_ERROR_MESSAGE });
      return;
    }
  }
  successCallBack();
};

export const fetchUser = userId => (
  new Promise((resolve, reject) => {
    request.get(`/demoapp/users/${userId}/`)
      .end((err, res) => {
        baseResponseHandler(err, res, reject, () => {
          resolve(res.body);
        });
      });
  })
);

export const fetchAllUsers = (userId) => {
  let url = '/demoapp/users/';
  if (userId) {
    url = `${url}?user_id=${userId}`;
  }
  return new Promise((resolve, reject) => {
    request.get(url)
      .end((err, res) => {
        baseResponseHandler(err, res, reject, () => {
          resolve(res.body);
        });
      });
  });
};

export const fetchPosts = usrId => (
  new Promise((resolve, reject) => {
    request.get(`/demoapp/posts/?user_id=${usrId}`)
      .end((err, res) => {
        baseResponseHandler(err, res, reject, () => {
          resolve(res.body);
        });
      });
  })
);


export const createPost = data => (
  new Promise((resolve, reject) => {
    request.post('/demoapp/posts/')
      .send(data)
      .end((err, res) => {
        baseResponseHandler(err, res, reject, () => {
          resolve(res.body);
        });
      });
  })
);

export const followUser = (userId, data) => (
  new Promise((resolve, reject) => {
    request.post(`/demoapp/users/${userId}/follow/`)
      .send(data)
      .end((err, res) => {
        baseResponseHandler(err, res, reject, () => {
          resolve(res.body);
        });
      });
  })
);
