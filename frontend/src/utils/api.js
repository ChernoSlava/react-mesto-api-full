/* eslint-disable class-methods-use-this */
class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`Что-то упало в _checkResponse: ${res.status}`),
    );
  }

  _request(url, options) {
    const token = localStorage.getItem('jwt');
    return fetch(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }

  setUserAvatarToServer(avatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.deleteLike(id);
    }
    return this.doLike(id);
  }

  deleteLike(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  doLike(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  postCard(data) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  setUserInfoToServer(data) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  getInitialCards() {
    return Promise.all([this.getUserInfoFromServer(), this.getCards()]);
  }

  getCards() {
    return this._request(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    });
  }

  getUserInfoFromServer() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    });
  }
}

// const api = new Api({
//   url: "https://api.mesto.chernoslava.nomoredomains.club",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
const api = new Api({
  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
