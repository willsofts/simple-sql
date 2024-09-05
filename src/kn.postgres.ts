import { KnDBConnections, KnSQL } from "@willsofts/will-sql";

async function testdb() {
    let knsql = new KnSQL();
    knsql.append("select * from testdbx where sharecode = ?sharecode ");
    knsql.set("sharecode","BBL");
    console.log(knsql);
    const db = KnDBConnections.getDBConnector("POSTGRES");
    let rs = await knsql.executeQuery(db);
    console.log("rs",rs);
    db.close();
}

async function testupdate() {
    let knsql = new KnSQL();
    knsql.append("update testdbx set percentage = ?percentage where mktid = ?mktid ");
    knsql.set("percentage",60);
    knsql.set("mktid","TSO");
    console.log(knsql);
    const db = KnDBConnections.getDBConnector("POSTGRES");
    await db.beginWork();
    let rs = await knsql.executeUpdate(db);
    console.log("update",rs);
    await db.commitWork();
    db.close();
    db.end();
}

async function test() {
    await testdb();
    await testupdate();
}

test();
