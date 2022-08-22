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

const renderUI = (getTitlePage, getJudul, getAddTitle, getAddLink, res) => {
  res.render("dashboard/dashboard", {
    layout: "./layout/main",
    title: getTitlePage,
    getJudul: getJudul,
    getAddTitle: getAddTitle,
    getAddLink: getAddLink,
  });
};

module.exports = { confirmUI, loginUI, renderUI };
