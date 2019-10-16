const catchAsync = fn => {
  return (parent, args, ctx, info) => {
    fn(parent, args, ctx, info).catch(err => {
      throw new Error(err.message);
    });
  };
};

module.exports = catchAsync;
