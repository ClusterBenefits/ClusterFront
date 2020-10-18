import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Body, Text, H1, CheckBox } from "native-base";
import T from "prop-types";
import { BlueButton, Container, Header } from "../../../components";
import { screens } from "../../../constants";

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1
  },
  H1: {
    marginBottom: 10
  },
  text3: {
    marginBottom: 10,
    flex: 1,
    textAlign: "justify"
  },
  bold: {
    fontWeight: "bold"
  },
  textBlock: {
    padding: 20
  },
  button: {
    marginHorizontal: 20
  },
  bottomContainer: {
    borderBottomWidth: 0,
    marginHorizontal: 10,
    marginVertical: 10
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
    marginHorizontal: 15
  },
  checkBox: {
    backgroundColor: "transparent"
  },
  extraMarginLeft: {
    marginLeft: 30,
    marginHorizontal: 20
  }
});
export default function AgreementScreen({ navigation }) {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <Container>
      <Container withScroll>
        <Header titleText="Умови користування" navigation={navigation} />
        <View style={s.container}>
          <H1 style={s.H1}>Договір публічної оферти</H1>
          <Text style={s.text3}>
            <Text style={s.textBlock}>
              <Text t={s.textBlock}>
                {"\t"} Викладений нижче текст Договору, адресований фізичним особам і є офіційною публічною
                пропозицією (офертою) (відповідно до ст. 641 Цивільного кодексу України) __________________,
                (далі – «Виконавець»), що діє на підставі _______________ укласти договір публічної оферти на
                встановлених Виконавцем умовах.
              </Text>
              <Text>
                {"\n"}
                {"\t"} Договір вважається укладеним в порядку ст. 642 Цивільного кодексу України та здійснення
                дій, що передбачені цим Договором, що означають повне і беззастережне прийняття Вами (далі –
                «Користувач») всіх умов Договору без будь-яких виключень та/або обмежень (акцепт).
              </Text>
            </Text>{" "}
            {"\n"}
            <Text>
              <Text style={s.bold}>
                {"\n"}Терміни: {"\n"}
              </Text>
              <Text style={s.bold}>Користувач</Text> – будь-яка фізична дієздатна особа або юридична особа,
              яка прийняла умови цього Договору і користується мобільним додатком ІТ Benefits. {"\n"}
              <Text style={s.bold}>Мобільний додаток</Text> – ІТ Benefits, який є повнофункціональним об’єктом
              Інтелектуальної власності, призначення якого надання знижок та пропозицій для зареєстрованих
              користувачів.{"\n"}
              <Text style={s.bold}>Виконавець</Text>– юридична особа, яка реалізує послуги, які пропонуються у
              мобільному додатку для Користувача. {"\n"}
              <Text style={s.bold}>Система знижок</Text> – комплекс послуг/товарів партнерів Виконавця, які
              пропонуються Користувачеві після реєстрації з певною знижкою.
            </Text>
            <Text>
              {"\n"}
              {"\n"}
              <Text style={s.bold}>1. Предмет Договору</Text>
              {"\n"}1.1 Виконавець надає Користувачам право використовувати Мобільний додаток з метою
              отримання системи знижок за допомогою використання функціоналу мобільного додатку.{"\n"}1.2 При
              оплаті та використанні Мобільного додатку Користувач погоджується та підпорядковується цьому
              Договору та умовам використання.{"\n"}1.3 Чинна версія даного Договору завжди розміщена у
              Мобільному додатку Виконавця і в обов’язковому порядку є доступна для ознайомлення Користувачу
              до моменту здійснення ним акцепту умов Договору.{"\n"}1.4 Користувач підтверджує, що
              ознайомлений та погоджується з цим Договором. У разі якщо Користувач проти положень, він отримує
              обмежені можливості при використанні Мобільним додатком.{"\n"}1.5 Якщо Користувач не реєструє
              власний обліковий запис, Користувачу не доступний перелік пропозицій у системі знижок на товари.
            </Text>
            {"\n"}
            <Text>
              <Text style={s.bold}> {"\n"}2. Права та обов’язки сторін:</Text>
              {"\n"}2.1. Виконавець має право: – в односторонньому порядку призупинити користування мобільним
              додатком у разі порушення умов цього Договору або з інших обґрунтованих причин; - заблокувати
              та/або анулювати обліковий запис недобросовісного Користувача у наступних випадках, якщо
              Користувач: порушив умови цього Договору; вчинив дій з корисливих мотивів або в інших цілях, які
              впливають на рейтинг партнерів, які розміщені у мобільному додатку; призупинити систему знижок
              при несвоєчасному виконанні Користувачем своїх грошових зобов’язань перед Виконавцем; частково
              або повністю призупинити мобільний додаток у разі неможливості повноцінного функціонування
              мобільного додатку у зв’язку з технічними або іншими проблемами.{"\n"} 2.2.Виконавець
              зобов’язується: - надати знижку на товари/послуги для зареєстрованих Користувачів, які здійснили
              оплату за користування мобільним додатком на умовах цього Договору.{"\n"} 2.3. Користувач має
              право: - отримати від Виконавця інформацію, яка необхідна для прийняття акцепту за цим
              Договором; - відмовитись від акцепту, шляхом повідомлення Виконавця на електронну адресу та
              анулювання власного облікового запису.{"\n"} 2.4. Користувач зобов’язаний: - дотримуватись умов
              цього договору; - створити і використовувати тільки один обліковий запис і не передавати третім
              особам доступ або облікові дані для доступу до нього; - у разі продовження користування
              мобільним додатком необхідно здійснити оплату.
            </Text>
            <Text>
              {"\n"}
              <Text style={s.bold}>{"\n"}3. Порядок користування мобільним додатком</Text> {"\n"} 3.1
              Користувач здійснює завантаження мобільного додатку _________ у разі доступу до мережі Інтернет,
              реєстрація відбувається шляхом створення унікального логіну та паролю, який належить лише
              Користувачу, в результаті створюється обліковий запис та здійснює оплату у платіжній системі.{" "}
              {"\n"}3.2 Виконавець не несе відповідальності у разі втрати та/чи знищення пароля,
              конфіденційної інформації Користувача.
            </Text>
            <Text>
              {"\n"}
              <Text style={s.bold}>{"\n"}4. Порядок прийняття акцепту</Text> {"\n"}4.1. Користувач отримує
              доступ до категорії послуг після здійснення оплати безготівковою платіжною системою «LiqPay».
              Оплата з сторони Користувача засвідчує бажання укласти цей договір та прийняттям пропозиції.{" "}
              {"\n"}4.2. Після здійснення оплати Користувач отримує знижки на запропоновані товари/послуги від
              системи знижок.
              {"\n"}4.3. Послуги вважаються наданими після здійснення оплати та отримання інформації по
              товарах/послугах. Користувач не може використовувати систему знижок без реєстрації та без
              оплати. Для використання системи знижок Користувач обов’язково повинен вказати унікальний логін
              та пароль для створення облікового запису та здійснити оплату шляхом додавання платіжної картки
              до безготівкової платіжної системи «LiqPay». Користувач не має права зберігати, розміщувати,
              копіювати інформацію, яка міститься у мобільному додатку та є об’єктом інтелектуальної
              власності, через які можуть виникнути порушення прав третіх осіб, права на захист персональних
              даних. Договір може доповнюватись та/чи змінюватись. При реєстрації у мобільному додатку
              Користувач надає згоду на внесення змін до Договору без отримання повідомлення про це.
              Виконавець не гарантує, що система знижок/мобільний додаток будуть відповідати цілям та
              очікуванням Користувача або будь-яких інших осіб.
              <Text>
                {"\n"}
                <Text style={s.bold}>{"\n"}5. Захист персональних даних</Text> {"\n"}5.1 Користувач надає
                дозвіл на обробку, захист персональних даних, відповідно до вимог Закону України «Про захист
                персональних даних», необхідно відповідно до визначеної мети обробки персональних даних.
              </Text>
              <Text>
                {"\n"}
                <Text style={s.bold}>{"\n"}6. Порядок оплати</Text> {"\n"}6.1 Оплата здійснюється після
                реєстрації у мобільному додатку шляхом використання безготівкової платіжної системи «LiqPay»
                згідно з тарифом, що вказаний у платіжній системі. Оплата здійснюється шляхом внесення
                щомісячних платежів на користь Виконавця. {"\n"}6.2 Оплата системи знижок у Мобільному додатку
                проводиться Користувачем з використанням особистого рахунку в обліковому записі Користувача.{" "}
                {"\n"}6.3 Сума оплати вказується за один календарний місяць, для продовження користування
                мобільним додатком необхідно здійснити нову оплату. {"\n"}6.4 Кошти можуть бути повернені
                Користувачу згідно з його вимогою лише за умови, що на момент вимоги Користувачу не було
                надано доступ до системи знижок.
              </Text>
              <Text>
                {"\n"}
                <Text style={s.bold}>{"\n"}7. Про Мобільний додаток</Text> {"\n"}7.1 Мобільний додаток
                надається у використання Користувачу виключно в цілях, які передбачені цим Договором. {"\n"}
                7.2 Виконавець не несе відповідальність за за достовірність розміщення інформації, якість
                пропозиції/товарів, розмір знижок партнері та за платіжну систему. {"\n"}7.3 Виконавець може
                припинити дію Мобільного додатку без попереднього повідомлення про це Користувача до моменту
                виправлення недоліків.
              </Text>
              <Text>
                {"\n"}
                <Text style={s.bold}>{"\n"}8. Захист інтелектуальної власності</Text>
                {"\n"}8.1 Користувач погоджується та гарантує, що не володіє жодними майновими/немайновими
                правами. У разі неправомірного використання Мобільного додатку Користувачем, Виконавець має
                право анулювати, заблокувати цього Користувача та вимагати відшкодування збитків відповідно до
                чинного законодавства України. {"\n"}8.2 Виконавець гарантує, що права інтелектуальної
                власності не порушують жодних прав будь-якої третьої особи. {"\n"}8.3 Всі об'єкти права
                інтелектуальної власності, належать на праві власності Виконавцяю. {"\n"}8.4 Угода не
                передбачає надання будь-яких прав або дозволів Користувачеві чи Партнерам на використання
                Мобільним додатком, крім використання за функціональним призначення. {"\n"}8.5 Користувач
                зобов’язаний не використовувати та не поширювати інформацію, яка суперечить чинному
                законодавству, Конституції України та іншим нормативно-правовим актам.
              </Text>
              <Text>
                {"\n"}
                <Text style={s.bold}>{"\n"}9. Термін дії Договору</Text> {"\n"}9.1 Договір набирає чинності з
                моменту пропозиції його укласти (оферти) Виконавцем і її прийняття (акцепту) Користувачем, а
                саме розміщення умов цього Договору у Мобільному додатку. Договір діє до моменту її
                відкликання Виконавцем шляхом надсилання електронного листа на електронну адресу Виконавця.
              </Text>
              <Text>
                {"\n"}
                <Text style={s.bold}>{"\n"}10. Прикінцеві положення</Text> {"\n"}10.1 Угода відповідає чинному
                законодавству України, неврегульовані питання цією Угодою підлягають вирішенню відповідно до
                чинного законодавства України. {"\n"}10.2 Договір є укладеним за місцезнаходженням Виконавця.{" "}
                {"\n"}10.3 Усі спори, розбіжності або вимоги, що виникають за цією Угодою, в тому числі що
                стосуються його тлумачення, виконання, порушення, припинення або недійсності, підлягають
                вирішенню в відповідно до чинного законодавства України за місцезнаходженням Виконавця. {"\n"}
                10.4 Ця Угода складена українською мовою.
              </Text>
              <Text>
                {"\n"}
                {"\n"}
                Останні зміни: “___” ___ 2020 року {"\n"}
                <Text style={s.bold}>{"\n"}РЕКВІЗИТИ:</Text> {"\n"}
                <Text style={s.bold}>ВИКОНАВЕЦЬ {"\n"}</Text>Місцезнаходження: ___ {"\n"}Тел: +_______
                {"\n"}Електронна адреса: _____
              </Text>
            </Text>
          </Text>
        </View>
      </Container>
      <View style={s.bottomContainer}>
        <View style={s.checkboxContainer}>
          <CheckBox
            style={s.checkBox}
            checked={isChecked}
            onPress={() => setIsChecked(prevState => !prevState)}
          />
          <Body style={s.extraMarginLeft}>
            <Text>Я погоджуюсь з умовами користування сервісом</Text>
          </Body>
        </View>
        <BlueButton
          text="Далі"
          disabled={isChecked}
          style={s.button}
          onPress={() => navigation.navigate(screens.AddCreditInfoScreen)}
          withMarginBottom
        />
      </View>
    </Container>
  );
}

AgreementScreen.propTypes = {
  navigation: T.object.isRequired
};
