import React from 'react';
import { SafeAreaView, Text, View, StyleSheet,ScrollView  } from 'react-native';

export default function Tip_1_Screen({navigation}) {
    return (
    <SafeAreaView style={styles.box}>
        <ScrollView>

            <Text style={styles.toppic}>10 วิธีจัดการเวลา ให้คุณจัดการสิ่งต่างๆ ได้อย่างมีประสิทธิภาพ</Text>
            <Text style={styles.content}>   เคยรู้สึกไหมว่า บางครั้ง เวลาในหนึ่งวันเหมือนจะไม่เพียงพอ เมื่อเทียบกับสิ่งที่คุณต้องทำ?
    เคล็ดลับความสำเร็จของคนที่ประสบความสำเร็จส่วนใหญ่ล้วนอยู่ที่การจัดการเวลา เมื่อคุณรู้เคล็ดลับเล็กน้อยเหล่านี้ คุณเองก็สามารถจัดการชีวิตให้ลงตัวได้อย่างมีประสิทธิภาพเช่นกัน
            </Text>
            <Text style={styles.pet}>สัตว์เลี้ยง:" ไปดูกันเถอะ เจ้ามนุษย์ "</Text>
            <Text></Text>
            
            <Text style={styles.h1}>1. ใช้โพสต์อิทเพื่อจัดระเบียบงานที่คุณต้องทำ</Text>
            <Text style={styles.content}>   เรียงลำดับความสำคัญก่อนหลัง กำหนดเวลา และอื่นๆ เมื่อทำเรียบร้อยแล้วคุณก็แค่ดึงออกไป</Text>
            <Text style={styles.pet}>สัตว์เลี้ยง:" ใช้แอปเราดีกว่านะมนุษย์ ไม่ต้องเปลืองกระดาษ แถมใช้ฟรีด้วยน้า เช็คดูที่หน้า  calendar ได้เลย  "</Text>
            <Text></Text>
            <Text style={styles.h1}>2. ตื่นนอนในเวลาเดิมทุกวัน</Text>
            <Text style={styles.content}>   วิธีนี้จะช่วยให้คุณตั้งนาฬิกาชีวิตได้อย่างเป็นปกติ และทำให้ร่างกายทำงานได้อย่างมีประสิทธิภาพมากยิ่งขึ้น</Text>
            <Text style={styles.pet}>สัตว์เลี้ยง:" อย่าลืมไปตั้งนาฬิกาปลุกด้วยละ เจ้ามนุษย์  "</Text>
            <Text></Text>
            <Text style={styles.h1}>3. อย่าทำอะไรหลายๆ อย่างพร้อมกัน</Text>
            <Text style={styles.content}>   การจัดการสิ่งหลายอย่างพร้อมกันอาจทำให้งานที่ได้ไม่มีประสิทธิภาพมากที่ควร สิ่งที่ควรจะทำจริงๆ คือการจัดการแต่ละเรื่องให้เสร็จเป็นอย่างๆ ไป โดยเรียงตามความเร่งรีบและความสำคัญก่อน</Text>
            <Text style={styles.pet}>สัตว์เลี้ยง:" ลองดูนะ เจ้ามนุษย์ อย่าจัดเวลาทับกันละ  "</Text>
            <Text></Text>
            <Text style={styles.h1}>4. ทำบันทึกว่าแต่ละงานใช้เวลานานเท่าไหร่?</Text>
            <Text style={styles.content}>   เพื่อช่วยให้คุณสามารถประเมินตัวเองได้ว่างานที่ต้องทำนั้นจะใช้เวลาสักเท่าไร และวางแผนได้ว่าจะเริ่มทำอย่างไหนก่อน-หลัง</Text>
            <Text style={styles.pet}>สัตว์เลี้ยง:" ถ้าไม่แน่ใจ ก็เพื่อเวลาไว้ก็ได้นะ มนุษย์  "</Text>
            <Text></Text>
            <Text style={styles.h1}>5. กำหนดธีมให้กับแต่ละวันของสัปดาห์</Text>
            <Text style={styles.content}>   การกำหนดธีมในแต่ละวันจะช่วยสร้างสีนสันให้กับชีวิตและเพิ่มแรงจูงใจในการลุกขึ้นมาทำอะไรสักอย่าง นอกจากนี้ ยังทำให้คุณมีเป้าหมายที่แน่ชัดในแต่ละวันอีกด้วย</Text>
            <Text style={styles.pet}>สัตว์เลี้ยง:" วันศุกร์เป็นวันของหมูปิ้ง เอ๊!!ชั้นไม่ได้พูดอะไรซะหน่อย คิดไปเองละ เจ้ามนุษย์ "</Text>
            <Text></Text>
            <Text style={styles.h1}>6. จัดลำดับความสำคัญงานของคุณ</Text>
            <Text style={styles.content}>   หลายครั้งเวลารีบๆ คนเรามักลืมนึกถึงเรื่องนี้ไป การจัดลำดับความสำคัญไม่เพียงทำให้คุณรู้ว่าจะทำอย่างไรกับงานที่มากล้นมหาศาล แต่จะทำให้คุณมีสกิลการจัดการปัญหาเฉพาะหน้าได้ดีขึ้นด้วย และอย่าลืมว่า “ความสำคัญของงานแต่ละชิ้นไม่ได้อยู่แค่ที่กำหนดเวลา แต่อยู่ที่ว่างานเหล่านั้นมีผลอย่างไรต่อเป้าหมายและการเติบโตขององค์กรด้วย”</Text>
            <Text style={styles.pet}>สัตว์เลี้ยง:" สิ่งนี้แอปเราก็มีนะ อย่าลืมไปใช้ด้วยละ "</Text>
            <Text></Text>
            <Text style={styles.h1}>7. วางแผนแต่ละวันก่อนนอน</Text>
            <Text style={styles.content}>   วิธีนี้จะช่วยให้คุณไม่ต้องร้อนรนถึงงานในวันรุ่งขึ้น การเตรียมตัวก่อนนอนเป็นช่วงเวลาที่คุณสามารถค่อยๆ ไตร่ตรองและวางแผนงานที่จะทำได้อย่างดี</Text>
            <Text style={styles.pet}>สัตว์เลี้ยง:" ลองนำไปใช้ดูก็ได้นะ เจ้ามนุษย์ "</Text>
            <Text></Text>
            <Text style={styles.h1}>8. ทำช่วงเวลาเดินทางให้มีประโยชน์</Text>
            <Text style={styles.content}>   คนที่ทำงานในเขตเมืองใหญ่อย่างกรุงเทพมหานครน่าจะเข้าใจดีถึงภาวะรถติดอย่างน่ารำคาญใจ ทว่า ในช่วงเวลานั้นคุณสามารถทำสิ่งที่เป็นประโยชน์ได้หลายอย่าง เช่น ฟังพอสคาสต์ที่เป็นประโยชน์และอาจช่วยเพิ่มความคิดสร้างสรรค์ของคุณได้</Text>
            <Text style={styles.pet}>สัตว์เลี้ยง:" อย่าลืมมองทางด้วยละ เราเป็นห่วงเธอนะ เจ้ามนุษย์  "</Text>
            <Text></Text>
            <Text style={styles.h1}>9. วางโทรศัพท์มือถือของคุณไว้นอกห้องนอน</Text>
            <Text style={styles.content}>   เมื่อคุณหลับ สมองจะทำการจัดระเบียบความทรงจำและความคิด ดังนั้นเพื่อไม่ให้มีอะไรรบกวนเวลานอน จึงควรเก็บโทรศัพท์ไว้ห่างๆ</Text>
            <Text style={styles.pet}>สัตว์เลี้ยง:" หลังวางแผนเสร็จก็วางลง อย่าไปเลือน Facebook ก่อนนอนละ เจ้ามนุษย์ "</Text>
            <Text></Text>
            <Text style={styles.h1}>10. เริ่มวันใหม่ด้วยงานที่สำคัญที่สุด</Text>
            <Text style={styles.content}>   การทำแบบนี้จะทำให้คุณรู้สึกว่าเรื่องยากที่สุดได้ผ่านไปแล้ว หากคุณตั้งต้นวันทำงานด้วยการตอบอีเมลหรือตรวจสอบโซเชียมีเดีย คุณจะต้องเสียเวลาอย่างมากโดยใจพะวงอยู่กับสิ่งที่ต้องทำ และนั่นจะทำให้ทุกอย่างรวน</Text>
            <Text style={styles.pet}>สัตว์เลี้ยง:"ต้องลองเอาไปใช้แล้วละ เจ้ามนุษย์"</Text>
            <Text></Text>
            <View style={styles.creditBox}>
                <Text style={styles.credit}>Credit: https://www.scholarship.in.th/10-time-management-tips/</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    toppic: {
        fontSize: 24,
        fontWeight:'bold', 
    },
    box: {
        backgroundColor: 'white',
        margin: 2,
        maxWidth: '97%',
        alignSelf: 'center',
        padding: 12,
    },
    content: {
        fontSize: 14,
        color: 'gray',
        padding: 8,
    },
    h1: {
        fontSize: 18,
        fontWeight:'bold',           
    },
    creditBox:{
        
    },
    credit: {
        fontSize: 14,
        color: 'blue',  
    },
    pet: {
        fontSize: 14,
        color: 'green',
        paddingLeft:8,
    }
  });