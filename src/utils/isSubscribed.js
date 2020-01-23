function dateCompare(date) {
  var parts = date.split("-");
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

export default subscription =>
  !!subscription &&
  subscription.expired_at &&
  subscription.status === "subscribed" &&
  dateCompare(subscription.expired_at).getTime() > new Date().getTime();
