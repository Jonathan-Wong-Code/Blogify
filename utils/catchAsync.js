const catchAsync = fn => (parent, args, ctx, info) =>
  fn(parent, args, ctx, info).catch(e => {
    throw new Error(e.message);
  });

module.exports = catchAsync;
