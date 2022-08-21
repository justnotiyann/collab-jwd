const confirmUI = (title, desc, link, res) => {
  res.render("components/confirm", {
    layout: "./layout/main",
    title: title,
    desc: desc,
    link: link,
  });
};

const loginUI = (title, desc, color, res) => {
  res.render("sistem-login/login", {
    layout: "./layout/main",
    title: title,
    desc: desc,
    color: color,
  });
};

module.exports = { confirmUI, loginUI };
