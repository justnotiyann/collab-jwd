const confirmUI = (title, desc, link, res) => {
  res.render("components/confirm", {
    layout: "./layout/main",
    title: title,
    desc: desc,
    link: link,
  });
};

module.exports = { confirmUI };
