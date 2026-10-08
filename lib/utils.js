const _ = require("lodash");
const dayjs = require("dayjs");
const classNames = require("classnames");

// Regroupe les dépendances par type de montée de version attendue
function groupByType(deps) {
  return _.groupBy(deps, (d) => d.type);
}

function formatDate(date) {
  return dayjs(date).format("DD/MM/YYYY");
}

function badgeClass(type) {
  return classNames("badge", {
    "badge-major": type === "major",
    "badge-minor": type === "minor",
  });
}

module.exports = { groupByType, formatDate, badgeClass };
