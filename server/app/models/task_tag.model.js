module.exports = (connex) => {
  const TaskTag = connex.define('task_tag', {}, { timestamps: false });

  return TaskTag;
};
