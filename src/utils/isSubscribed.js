export default subscription =>
  !!(
    subscription &&
    subscription.expired_at &&
    new Date(subscription.expired_at).getTime() > new Date().getTime()
  );
