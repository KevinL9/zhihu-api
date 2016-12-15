const parser = require('../parser/question')
const baseurl = require('../urls').baseurl

module.exports = function(req) {
  /**
   * Initialize a `Question`.
   *
   * @param {Number} id
   * @public
   */
  function Question(id) {
    if (!(this instanceof Question)) {
      return new Question(id)
    }

    this.id = id
    this.url = `${baseurl}/question/${this.id}`
  }

  Question.prototype._req = req
  Object.assign(Question.prototype, proto)

  return Question
}

var proto = {
  /**
   * Answers by voteup weights.
   *
   * @param  {Number} offset
   * @return {Promise}
   * @public
   */
  answersByVote(offset = 0) {
    var url = '/node/QuestionAnswerListV2'
    var form = {
      method: 'next',
      params: JSON.stringify({
        url_token: this.id,
        pagesize: 20,
        offset
      }),
      _xsrf: this._req._xsrf
    }

    return this._req.postForm(url, form)
      .then(data => parser.answersByVote(data.msg))
  },

  /**
   * Answers by page (or created time).
   *
   * @param  {Number} page
   * @return {Promise}
   * @public
   */
  answersByPage(page = 1) {
    var url = `/question/${this.id}`
    var params = {
      page,
      sort: 'created'
    }

    return this._req.get(url, params)
      .then(parser.answersByPage)
  },

  /**
   * Get detail of a question.
   *
   * @return {Promise}
   * @public
   */
  detail() {
    var url = `/question/${this.id}`
    return this._req.get(url)
      .then(parser.detail)
  },

  /**
   * Get followers of a question.
   *
   * @param  {Number} offset
   * @return {Promise}
   * @public
   */
  followers(offset = 0) {
    var url = `/question/${this.id}/followers`
    var form = {
      offset,
      start: 0,
      _xsrf: this._req._xsrf
    }

    return this._req.postForm(url, form)
      .then(data => parser.followers(data.msg[1]))
  }
}
