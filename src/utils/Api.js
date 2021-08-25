export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._getResponseData)
  }

  getInitialCards() {
  return fetch(`${this._baseUrl}/cards`, {
    method: 'GET',
    headers: this._headers
  }).then(this._getResponseData)
} 

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description
      })
    }).then(this._getResponseData)
  }

   setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarDescription
      })
    }).then(this._getResponseData)
  }

  postCard(data) {
  return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.mestoName,
        link: data.mestoDescription
      })
    }).then(this._getResponseData)
  }

  likeCard(data) {
  return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._getResponseData)
  }

  dislikeCard(data) {
  return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponseData)
  }
  
  deleteCard(data) {
  return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._getResponseData)
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
} 
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: '09fddbd8-b63c-4352-8240-79b061fd7f20',
    'Content-Type': 'application/json'
  }
}); 

export default api;