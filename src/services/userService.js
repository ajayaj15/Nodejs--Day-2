import { format } from "date-fns";
let room = [
  {
    roomId: 1,
    roomNo: 101,
    roomName: "Normal Room",
    amenties: ["Tv", "Heater"],
    room_booked_dates: [],
    price: 500,
  },

  {
    roomId: 2,
    roomNo: 102,
    roomName: "Standard Room",
    amenties: ["Tv", "Heater"],
    room_booked_dates: [],
    price: 1000,
  },
  {
    roomId: 3,
    roomNo: 103,
    roomName: "Deluxe Room",
    amenties: ["Tv", "AC", "Heater"],
    room_booked_dates: [],
    price: 1500,
  },
];

let bookingDetails = [];

const createRoom = (req, res) => {
  try {
    const { roomNo, ...rest } = req.body;

    let roomExist = room.every((item) => {
      return item.roomNo === roomNo;
    });

    if (roomExist) {
      return res.status(401).send({
        message: "Room already exists",
      });
    }

    let newRoom = {
      roomId: room.length + 1,
      ...rest,
      roomNo,
    };

    room.push(newRoom);
    res.status(201).send({
      message: "Room Has Been Created",
      room,
    });
  } catch (error) {
    res.status(500),
      send({
        message: error.message || "Internal Server Error",
        error,
      });
  }
};

const bookRoom = (req, res) => {
  try {
    const { customerName, date, startTime, endTime, roomId } = req.body;
    let dateTime = new Date();
    let today = format(dateTime, "yyyy-MM-dd");

    let roomIndex = room.findIndex((item) => {
      return item.roomId === roomId;
    });
    let roomDetails = room[roomIndex];

    let isBooked = roomDetails.room_booked_dates.length
      ? roomDetails.room_booked_dates.some(
          (bookingDetails) => bookingDate === date
        )
      : false;

    if (isBooked) {
      return res.status(400).send({
        message: `This Room is already Booked`,
      });
    }

    if (date < today) {
      return res.status(400).send({
        message: `Booking Date must be equal to today or in future`,
      });
    }

    let roomDateCheck = bookingDetails.some(
      (e) => e.date === date && e.roomId === roomId
    );

    if (roomDateCheck) {
      return res.status(404).send({
        message: `For the given roomId : ${roomId} is not available on the given date ${date}`,
      });
    }

    let newBooked = {
      customerName,
      date,
      startTime,
      endTime,
      roomId,
      bookedStatus: "Booked",
      bookingDate: today,
      bookingId: bookingDetails.length + 1,
    };
    bookingDetails.push(newBooked);
    roomDetails.room_booked_dates.push(date);
    res.status(201).send({
      message: `Room Booked Successfully`,
      roomDetails: {
        roomName: roomDetails.roomName,
        ...newBooked,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const customerBookingDetails = (req, res) => {
  try {
    const { customerName } = req.params;
    let customerDetails = bookingDetails.filter((item) => {
      return item.customerName === customerName;
    });

    if (customerDetails.length === 0) {
      res.status(404).send({
        message: `There is room with the customer name ${customerName}`,
      });
    }

    customerDetails = customerDetails.map((item) => {
      let roomDetails = room.find((rooms) => rooms.roomId === item.roomId);
      item.roomName = roomDetails.roomName;
      return item;
    });

    let customerDetailsInfo = {
      customerName: customerDetails.customerName,
      booking_count: customerDetails.length,
      roomInfo: customerDetails.map((item) => ({
        roomName: item.roomName,
        date: item.date,
        startTime: item.startTime,
        endTime: item.endTime,
        bookingId: item.bookingId,
        bookingStatus: item.bookingStatus,
        bookingDate: item.bookingDate,
      })),
    };

    res.status(200).send({
      message: "Information about the customer",
      customerDetailsInfo,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const allBookedCustomerDetails = (req, res) => {
  try {
    let allBookedCustomerDetails = bookingDetails
      .map((item) => {
        let roomDetails = room.find((rooms) => {
          return rooms.roomId === item.roomId && item.bookedStatus === "Booked";
        });

        if (roomDetails) {
          let details = {
            customerName: item.customerName,
            roomName: roomDetails.roomName,
            date: roomDetails.date,
            startTime: roomDetails.startTime,
            endTime: roomDetails.endTime,
            roomId: roomDetails.roomId,
            bookedStatus: item.bookedStatus,
          };
          return details;
        } else {
          return null;
        }
      })
      .filter((details) => details !== null);

    res.status(200).send({
      message: "All Booked Customer Details",
      allBookedCustomerDetails,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const allBookedRoomDetails = (req, res) => {
  try {
    let allBookedCustomerDetails = bookingDetails
      .map((item) => {
        let roomDetails = room.find((rooms) => {
          return rooms.roomId === item.roomId && item.bookedStatus === "Booked";
        });

        if (roomDetails) {
          let details = {
            customerName: item.customerName,
            roomName: roomDetails.roomName,
            date: roomDetails.date,
            startTime: roomDetails.startTime,
            endTime: roomDetails.endTime,
            roomId: roomDetails.roomId,
            bookedStatus: item.bookedStatus,
          };
          return details;
        } else {
          return null;
        }
      })
      .filter((details) => details !== null);

    res.status(200).send({
      message: "All Booked Customer Details",
      allBookedCustomerDetails,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};
export default {
  createRoom,
  bookRoom,
  customerBookingDetails,
  allBookedCustomerDetails,
  allBookedRoomDetails,
};
