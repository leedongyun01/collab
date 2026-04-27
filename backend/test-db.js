const db = require('./src/config/db');

async function testConnection() {
  console.log("=========================================");
  console.log("🔍 데이터베이스 연결 테스트를 시작합니다...");
  console.log("=========================================");
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log("✅ 성공: 데이터베이스에 정상적으로 연결되었습니다!");
    
    console.log("\n🔍 'users' 테이블이 존재하는지 확인합니다...");
    const [tables] = await db.query("SHOW TABLES LIKE 'users'");
    if (tables.length > 0) {
      console.log("✅ 성공: 'users' 테이블이 존재합니다. 회원가입/로그인이 가능합니다.");
    } else {
      console.log("❌ 실패: DB에는 연결되었으나 'users' 테이블이 없습니다! 테이블을 생성해야 합니다.");
    }
  } catch (error) {
    console.log("❌ 실패: 데이터베이스 연결에 실패했습니다.");
    console.log("\n[에러 원인 분석]");
    if (error.code === 'ECONNREFUSED') {
      console.log("- MySQL 서버가 꺼져 있거나 설치되어 있지 않습니다. (포트 3306 확인)");
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log("- 비밀번호나 아이디가 틀렸습니다. (현재 세팅: root / 1234)");
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log("- 'collabmate' 라는 이름의 데이터베이스가 생성되어 있지 않습니다.");
    } else {
      console.log("- 상세 에러:", error.message);
    }
  } finally {
    process.exit();
  }
}

testConnection();
