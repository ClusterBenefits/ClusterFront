function dateCompare(date) {
  var parts = date.split("-");
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

export default subscription =>
  !!subscription &&
  subscription.expired_at &&
  dateCompare(subscription.expired_at).getTime() > new Date().getTime();
