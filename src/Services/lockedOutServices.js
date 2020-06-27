import axios from "axios";

export const checkIfLockedOut = async (ip) => {
  try {
    const check = await axios.get("/api/lockedOut");
    console.log(check, "this is probably empty");
    if (check.data[0]) {
      const dataArr = check.data[0].ips.banned;
      const dataArrId = check.data[0]._id;

      for (var i = 0; i < dataArr.length; i++) {
        //this section checks to see if the ip has been blocked
        //if it has and it's block's expiration hasn't happened yet, it will return true for still blocked
        //otherwise, it'll delete the ban on the ip
        if (dataArr[i].ip === ip) {
          if (new Date(dataArr[i].expiration) - new Date(Date.now()) > 0) {
            console.log("your mathic is working");
            return true;
          } else {
            const duplicateArr = [...dataArr];
            duplicateArr.splice(i, 1);
            const put = await axios.put(
              `/api/lockedOut/expiredBans/${dataArrId}`,
              { duplicateArr }
            );
            return false;
          }
        }
      }
    }
    return false;
  } catch (err) {
    console.log("This is your error: ", err);
  }
};

export const addToLockedOut = async (ip) => {
  try {
    const check = await axios.get("/api/lockedOut");
    // console.log(check.data.length, "Our check has revealed this");
    if (check.data.length === 0) {
      await axios.post("/api/lockedOut", {
        ips: { dudProp: true },
      });
    }
    const identify = await axios.get("/api/lockedOut");
    // console.log(identify, "identify object");
    const id = identify.data[0]._id;
    let arr = identify.data[0].ips.banned;

    const expiration = new Date(Date.now() + 180000 * 60);

    const newIp = { ip: ip, expiration: expiration };
    arr.push(newIp);
    const updated = { ...identify.data[0] };

    const lockedOut = axios.put(`/api/lockedOut/${id}`, updated);
  } catch (err) {}
};
