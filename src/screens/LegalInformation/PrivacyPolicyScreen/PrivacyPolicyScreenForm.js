import { Text, View } from 'native-base';
import Header from "../../../components/Header";
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

const style = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    content: {
        marginTop: 15
    },
    subTitle: {
        fontWeight: 'bold',
    }
})

const PrivacyPolicyForm = ({navigation}) => (
    <View>
        <Header navigation={navigation} />
        <ScrollView style={style.wrapper}>
            <Text style={style.content}>

                <Text style={style.title}>Політика конфіденційності</Text>{'\n'}{'\n'}
                        Будь ласка, уважно прочитайте цю Політику конфіденційності перед використанням мобільного додатку IT BENEFITS.{'\n'}
                Громадська організація «Івано-Франківський ІТ-кластер» (Ідентифікаційний код: 39879896), (надалі - Організація) є правовласником мобільного додатку IT BENEFITS.{'\n'}
                Ця політика конфіденційності регулює сукупність дій з обробки, таких як збирання, реєстрація, накопичення, зберігання, адаптування, зміна, поновлення, використання і поширення (розповсюдження, реалізація, передача), знеособлення, знищення персональних даних користувачів мобільного додатку IT BENEFITS з використанням інформаційних (автоматизованих) систем в мережі Інтернет.{'\n'}{'\n'}

                <Text style={style.subTitle}>1. ЗАГАЛЬНІ ПОЛОЖЕННЯ{'\n'}{'\n'}</Text>      
                Персональні дані - відомості чи сукупність відомостей про фізичну особу-користувача, яка ідентифікована або може бути конкретно ідентифікована.{'\n'}
                Мобільний додаток - застосунок (програмне забезпечення) розроблене для засобів обчислювальної техніки (смартфонів), які працюють на базі операційних систем «iOS» та «Android», в тому числі планшетних пристроїв (далі – мобільні пристрої), набір інструкцій з індивідуальною структурою та дизайном у вигляді слів, цифр, кодів, схем, символів чи у будь-якому іншому вигляді, виражених у формі, придатній для зчитування на смартфоні, які приводять його у дію, що містить пропозиції суб’єктів господарювання на купівлю товару/послуги на вигідних для користувача умовах.{'\n'}
                Правовласник – Громадська організація «Івано-Франківський ІТ-кластер», якій належить право на використання, а також на використання і розповсюдження мобільного додатку, і яка здійснює обробку персональних даних користувачів.{'\n'}
                Користувач - будь-яка дієздатна фізична особа, яка зареєстрована у додатку та надає свої персональні дані.  {'\n'}
                Згода користувача - добровільне волевиявлення, дозвіл користувача на обробку його персональних даних відповідно до вказаної мети їх обробки, висловлене у формі, що передбачена цією політикою. {'\n'}
                Обробка персональних даних - будь-яка дія або сукупність дій, таких як збирання, реєстрація, накопичення, зберігання, адаптування, зміна, поновлення, використання і поширення (розповсюдження, реалізація, передача), знеособлення, знищення персональних даних, у тому числі з використанням інформаційних (автоматизованих) систем.{'\n'}
                Надання персональних даних - передача персональних даних користувачів будь-яким третім особам.{'\n'}
                Блокування персональних даних - тимчасове припинення обробки персональних даних (за винятком випадків, якщо обробка необхідна для уточнення персональних даних).{'\n'}
                Знищення персональних даних - дії, в результаті яких стає неможливим відновити зміст персональних даних у додатку та/або автоматизованих системах і (або) в результаті яких знищуються матеріальні носії персональних даних. {'\n'}
                Метою збору і обробки персональних даних Користувача є укладення договору на надання Користувачеві права на використання мобільного додатку. При збиранні та обробці персональних даних Правовласник не переслідує інших цілей, окрім цілей виконання зазначеного договору.{'\n'}
                Згода користувача надається під час реєстрації в мобільному додатку шляхом проставлення відмітки про надання дозволу на обробку правовласником його персональних даних відповідно до сформульованої мети їх обробки встановленої цією політикою.{'\n'}
                Персональні дані користувача зберігаються та обробляються на електронних носіях Правовласника або на хмарних сервісах в мережі Інтернет.{'\n'}
                Правовласник збирає і обробляє такі  дані користувача:{'\n'}
                    • прізвище, ім'я, по батькові;{'\n'}
                    • дата народження;{'\n'}
                    • е-mail.{'\n'}
                Доступ до персональних даних користувача має правовласник. Правовласник не розповсюджує персональні дані користувача, а також не надає до них доступ третім особам без попередньої згоди користувача, за винятком випадків надання персональних даних за запитами уповноважених державних органів відповідно до чинного законодавства.{'\n'}{'\n'}

                <Text style={style.subTitle}>2. ПРАВА КОРИСТУВАЧА{'\n'}{'\n'}</Text>
                У процесі обробки персональних даних користувач має право:{'\n'}
                    • отримувати інформацію про місцезнаходження своїх персональних даних, місцезнаходження правовласника, відомості про осіб (за винятком працівників Правовласника), які мають доступ до персональних даних або яким можуть бути розкриті персональні дані на підставі договору з правовласником або на підставі чинного законодавства;{'\n'}
                    • отримувати інформацію про умови надання доступу до персональних даних, зокрема інформацію про третіх осіб, яким передаються його персональні дані;{'\n'}
                    • на доступ до своїх персональних даних;{'\n'}
                    • отримувати не пізніш як за тридцять календарних днів з дня надходження запиту до правовласника, крім випадків, передбачених законом, відповідь про те, чи обробляються його персональні дані, а також отримувати зміст таких персональних даних;{'\n'}
                    • у письмовій або електронній формі пред’являти вмотивовану вимогу правовласнику із запереченням проти обробки своїх персональних даних;{'\n'}
                    • пред'являти вмотивовану вимогу правовласнику щодо зміни або знищення своїх персональних даних, якщо ці дані обробляються незаконно чи є недостовірними;{'\n'}
                    • на захист своїх персональних даних від незаконної обробки та випадкової втрати, знищення, пошкодження у зв'язку з умисним приховуванням, ненаданням чи несвоєчасним їх наданням, а також на захист від надання відомостей, що є недостовірними чи ганьблять честь, гідність та ділову репутацію фізичної особи;{'\n'}
                    • звертатися із скаргами на обробку своїх персональних даних до Уповноваженого Верховної Ради України з прав людини або до суду;{'\n'}
                    • застосовувати засоби правового захисту в разі порушення законодавства про захист персональних даних;{'\n'}
                    • вносити застереження стосовно обмеження права на обробку своїх персональних даних під час надання згоди;{'\n'}
                    • в будь-який момент відкликати згоду на обробку персональних даних;{'\n'}
                    • знати механізм автоматичної обробки персональних даних;{'\n'}
                    • на захист від автоматизованого рішення, яке має для нього правові наслідки;{'\n'}
                    • вимагати від правовласника уточнення його персональних даних, їх блокування або знищення у разі, якщо персональні дані є неповними, застарілими, неточними, або не є необхідними для заявленої мети обробки, а також вживати передбачених законом заходів для захисту своїх прав.{'\n'}
                    {'\n'}
                <Text style={style.subTitle}>3. ОБОВ’ЯЗКИ ПРАВОВЛАСНИКА{'\n'}{'\n'}</Text>
                У процесі обробки персональних даних правовласник зобов'язаний:{'\n'}
                    • надати користувачу на його прохання таку інформацію:{'\n'}
                    • підтвердження факту обробки персональних даних;{'\n'}
                    • правові підстави і мету обробки персональних даних;{'\n'}
                    • мету і способи обробки персональних даних;{'\n'}
                    • відомості про осіб (за винятком працівників), які мають доступ до персональних даних або яким можуть бути розкриті персональні дані на підставі договору або на підставі чинного законодавства;{'\n'}
                    • які персональні дані користувача обробляються, джерело їх отримання, якщо інший порядок представлення таких даних не передбачено чинним законодавством;{'\n'}
                    • строки обробки персональних даних, в тому числі строки їх зберігання;{'\n'}
                    • порядок здійснення користувачем прав, передбачених чинним законодавством;{'\n'}
                    • інформацію щодо транскордонної передачі даних, яка здійснилася або передбачається;{'\n'}
                    • інші відомості, передбачені чинним законодавством.{'\n'}
                    • забезпечити вжиття заходів щодо запобігання протиправному доступу до персональних даних користувача;{'\n'}
                    • оприлюднити чи іншим чином забезпечити необмежений доступ до цієї політики.{'\n'}
                Правовласник не несе відповідальності у разі знищення, блокування персональних даних через неналежне функціонування чи нефункціонування, збої у роботі, виході з ладу електронних носіїв та хмарних сервісів в мережі Інтернет, якщо таке неналежне функціонування, нефункціонування, збої у роботі та вихід з ладу відбувся не з вини Правовласника.{'\n'}
                Правовласник застосовує організаційні і технічні заходи щодо забезпечення безпеки персональних даних користувача, зокрема, використовує засоби захисту інформації, необхідні для запобігання несанкціонованого доступу до персональних даних; оцінює ефективність вжитих заходів щодо забезпечення безпеки персональних даних; забезпечує виявлення фактів несанкціонованого доступу до персональних даних та вжиття заходів; відновлює персональні дані, модифіковані або знищені внаслідок несанкціонованого доступу до них (за наявності технічної можливості такого відновлення); здійснює контроль за заходами щодо забезпечення безпеки персональних даних.{'\n'}
                    Якщо Ви не погоджуєтесь з цією Політикою або на внесені у неї зміни, слід вилучити завантажений мобільний додаток та видалити обліковий запис (якщо він зареєстрований) і припинити користуватися мобільним додатком. {'\n'}
                Якщо Ви видаляєте мобільний додаток з свого пристрою це не призводить до видалення персональних даних. Після видалення мобільного додатку та облікового запису Ви маєте право відповідно до розділу 2 цієї політики звернутися до Правовласника із вимогою видалити свої персональні дані.{'\n'}
                {'\n'}
                РЕКВІЗИТИ{'\n'}
                ГРОМАДСЬКА ОРГАНІЗАЦІЯ{'\n'}
                "ІВАНО-ФРАНКІВСЬКИЙ ІТ КЛАСТЕР"{'\n'}
                Ідентифікаційний код: 39879896{'\n'}
                Місцезнаходження: 76005 Україна,  м. Івано-Франківськ,  вул. Чорновола, буд. 125А, кв. 9{'\n'}
                E-mail: itbenefitscard@gmail.com{'\n'}{'\n'}
            </Text>
        </ScrollView>
    </View>
);

export default PrivacyPolicyForm;