const sql = require("./db");

const InfoDelivery = (delivery) => {
  this.customerID = delivery.customerID;
  this.name = delivery.name;
  this.phone = delivery.phone;
  this.city = delivery.city;
  this.district = delivery.district;
  this.ward = delivery.ward;
  this.specificAddress = delivery.specificAddress;
  this.description = delivery.description;
  this.dateCreate = delivery.dateCreate;
};

const getcurrentDateTime = () => {
  const currentDateTime = new Date();
  //get info date
  const year = currentDateTime.getFullYear();
  const month = String(currentDateTime.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0, nên cần cộng thêm 1
  const day = String(currentDateTime.getDate()).padStart(2, "0");

  //get info time
  const hours = String(currentDateTime.getHours()).padStart(2, "0");
  const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentDateTime.getSeconds()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
};

InfoDelivery.create = async (data) => {
  const currentdate = getcurrentDateTime();
  const query =
    "INSERT INTO infodelivery(customerID,name,phone,city,district,ward,specificAddress,description,dateCreate) VALUE (?,?,?,?,?,?,?,?,?)";
  await sql.query(query, [
    data.customerID,
    data.name,
    data.phone,
    data.city,
    data.district,
    data.ward,
    data.specificAddress,
    data.description,
    currentdate,
  ]);
  return { ...data, dateCreate: currentdate };
};

InfoDelivery.getByCustomerId = async (customerID) => {
  const query = "SELECT * FROM infodelivery WHERE customerID = ?";
  return await sql.query(query, [customerID]);
};

InfoDelivery.getByDeliveryId = async (infoDeliveryID) => {
  const query = "SELECT * FROM infodelivery WHERE infoDeliveryID = ?";
  return await sql.query(query, [infoDeliveryID]);
};

InfoDelivery.checkExistedByCustomerId_DeliveryId = async (deliveryID ,customerID ) => {
    const query = "SELECT * FROM infodelivery WHERE infoDeliveryID = ? AND customerID = ?";
    return await sql.query(query, [deliveryID, customerID]);
}

InfoDelivery.update = async (data) => {
  const currentdate = getcurrentDateTime();
  const query =
    "UPDATE infodelivery SET name = ?, phone = ?, city = ?, district = ?, ward = ?, specificAddress = ?, description = ?, dateCreate = ? WHERE infoDeliveryID = ? AND customerID = ?";
  await sql.query(query, [
    data.name,
    data.phone,
    data.city,
    data.district,
    data.ward,
    data.specificAddress,
    data.description,
    currentdate,
    data.infoDeliveryID,
    data.customerID
  ]);
  console.log("this is data...",{...data});
  return {...data, dateCreate: currentdate };
};

InfoDelivery.remove = async (id) => {
  const query = "DELETE FROM infodelivery WHERE infoDeliveryID = ?";
  await sql.query(query,[id]);
};

module.exports = InfoDelivery;
