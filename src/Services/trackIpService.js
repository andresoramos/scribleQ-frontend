import axios from "axios";

export const checkIpObject = async () => {
  try {
    const checked = await axios.get("/api/ipTracker");

    if (checked.data.length === 0) {
      const data = { data: checked.data, id: null };
      console.log(data, "what is wrong with data");
      return data;
    }
    const dataAndId = { data: checked.data[0].ips, id: checked.data[0]._id };
    return dataAndId;
  } catch (err) {
    console.log("this is the error: ", err.response);
  }
};

export const instantiateIpObject = async () => {
  const ipObject = { ips: { dudProp: true } };
  try {
    const checked = await axios.post("/api/ipTracker", ipObject);
    console.log("1/2 passed");
    return checked;
  } catch (err) {
    console.log("This is the error: ", err.response);
  }
};

export const putIpObject = async (ipObject) => {
  try {
    const put = await axios.put(`/api/ipTracker/${ipObject.id}`, ipObject);
    return put;
  } catch (err) {
    console.log("This is your error: ", err.response);
  }
};

export const getIp = async () => {
  try {
    const ip = await axios.get("/api/ipTracker/ip");
    return ip.data;
  } catch (err) {
    console.log("This is the error: ", err.response);
  }
};
