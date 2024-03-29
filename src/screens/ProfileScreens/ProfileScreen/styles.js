import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../constants';

export default StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    marginHorizontal: 15,
  },
  bodyContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 35,
  },
  companyContainer: {
    // elevation: 2,
    // shadowColor: colors.mainBlack,
    // shadowOffset: { width: 0, height: 12 },
    // shadowOpacity: 0.04,
    width: Dimensions.get('window').width * 0.7,
    marginVertical: 10,
    // backgroundColor: colors.mainWhite,
    alignItems: 'center',
    justifyContent: 'center',

    textAlign: 'center',
  },
  nameText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '700',
  },
  companyText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
  },
  positionText: {
    color: colors.mainGrey,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 15,
  },
  extraMarginRight: {
    marginRight: 5,
  },
  hitSlop: {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  },
  emptySpace: {
    width: 16,
    height: 1,
  },
  createdBy: {
    color: colors.mainGrey,
    fontSize: 10,
  },
  link: {
    color: colors.mainBlue,
  },
  linksWrapper: {
    marginTop: 8,
    width: Dimensions.get('window').width - 86,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 500,
  },
});
