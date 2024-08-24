const qrcode = require("qrcode");
const path = require("path");
const fs = require("fs");
const { log } = require("console");

const googlePay = async (req, res) => {
  try {
    const number = req.body.number;
    const paymentMethodData = req.body.paymentMethod

    const folderPath = path.join(__dirname, "../../", "public", "images");

    await emptyFolder(folderPath);

    const qrImagePath = path.join(
      __dirname,
      "../../",
      "public",
      "images",
      `google${number}.png`
    );
 
      console.log(paymentMethodData);
      console.log(number);

    const allKeys = {
      gp : `tez://upi/pay?pa=maulikpokiya7475@oksbi&pn=Maulik pokiya&am=${number}&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=Maulik pokiya`,  
      php : `phonepe://pay?pa=maulikpokiya7475@oksbi&pn&tn=Maulik pokiya&am=${number}&pn=Maulik pokiya&mode=02&mc=8999&purpose=00&cu=INR&sign=AAuN7izDWN5cb8A5scnUiNME+LkZqI2DWgkXlN1McoP6WZABa/KkFTiLvuPRP6/nWK8BPg/rPhb+u4QMrUEX10UsANTDbJaALcSM9b8Wk218X+55T/zOzb7xoiB+BcX8yYuYayELImXJHIgL/c7nkAnHrwUCmbM97nRbCVVRvU0ku3Tr`,
      ptm : `paytmmp://pay?pa=maulikpokiya7475@oksbi&pn=Maulik pokiya&am=${number}&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=Maulik pokiya`  
    }
    randomText = allKeys[paymentMethodData]
    console.log(randomText);
    

    qrcode.toFile(qrImagePath, randomText, (err) => {
      if (err) {
        console.error("Error generating QR code:", err);
        return res.status(500).send("Error generating QR code");
      }

      res.status(200).send({
        success: true,
        message: "success",
        data: `/images/google${number}.png`,
      });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ success: false, message: "Something wrong!!!", data: {} });
  }
};

module.exports = {
  googlePay,
};

async function emptyFolder(dir) {
  try {
    fs.readdir(dir, async (err, files) => {
      if (err) console.log(err);
      else {
        files.forEach((file) => {
          const filePath = path.join(dir, file);

          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting the file:", err);
            } else {
              // console.log('File deleted successfully.');
            }
          });
        });
      }
    });

    // Delete each file and directory
  } catch (err) {
    console.error("Error:", err);
  }
}
