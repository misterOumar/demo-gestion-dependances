const test = require("node:test");
const assert = require("node:assert");
const { groupByType, formatDate, badgeClass } = require("../lib/utils");

test("groupByType regroupe les dépendances par type", () => {
  const groups = groupByType([
    { name: "next", type: "major" },
    { name: "lodash", type: "patch" },
    { name: "react", type: "major" },
  ]);
  assert.strictEqual(groups.major.length, 2);
  assert.strictEqual(groups.patch.length, 1);
});

test("formatDate formate en JJ/MM/AAAA", () => {
  assert.strictEqual(formatDate("2026-10-08"), "08/10/2026");
});

test("badgeClass ajoute la classe du type", () => {
  assert.strictEqual(badgeClass("major"), "badge badge-major");
  assert.strictEqual(badgeClass("patch"), "badge");
});
