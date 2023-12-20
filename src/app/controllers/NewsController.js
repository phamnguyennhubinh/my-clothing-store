class NewsController {
  // GET /news
  index(req, res) {
    res.render('news');
  }

  // GET /news/:slug
  show(req, res) {
    console.log();
    res.send('NEWS DETAILS...');
  }
}

module.exports = new NewsController();
