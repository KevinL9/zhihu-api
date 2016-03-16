const expect = require('chai').expect
const urls = require('../lib/urls')
const baseurl = urls._baseurl

describe('urls', function() {
    it('urls.index()', function() {
        expect(urls.index()).to.equal(baseurl)
    })

    it('urls.user.detail(uname)', function() {
        expect(urls.user.detail('test')).to
            .equal(baseurl + '/people/test/about')
    })

    it('urls.user.profile(uname)', function() {
        expect(urls.user.profile('test')).to
            .equal(baseurl + '/node/MemberProfileCardV2?params=%7B%22url_token%22%3A%22test%22%7D')
    })

    it('urls.user.followers()', function() {
        expect(urls.user.followers()).to
            .equal(baseurl + '/node/ProfileFollowersListV2')
    })

    it('urls.user.followees()', function() {
        expect(urls.user.followees()).to
            .equal(baseurl + '/node/ProfileFolloweesListV2')
    })

    it('urls.user.answers(uname, page)', function() {
        expect(urls.user.answers('test', 1)).to
            .equal(baseurl + '/people/test/answers?page=1')
    })

    it('urls.question.latest()', function() {
        expect(urls.question.latest()).to
            .equal(baseurl + '/log/questions')
    })

    it('urls.question.answersByVote()', function() {
        expect(urls.question.answersByVote()).to
            .equal(baseurl + '/node/QuestionAnswerListV2')
    })

    it('urls.question.answersByPage(questionId, page)', function() {
        expect(urls.question.answersByPage(41325553)).to
            .equal(baseurl + '/question/41325553?sort=created&page=1')

        expect(urls.question.answersByPage(41325553, 2)).to
            .equal(baseurl + '/question/41325553?sort=created&page=2')
    })
})