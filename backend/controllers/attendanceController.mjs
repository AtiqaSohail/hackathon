import { Attendance } from "../models/attendanceModel.mjs";

export const checkIn = async (req, res) => {
  const { date } = req.body;
  const userId = req.user.id;

  try {
    const alreadyChecked = await Attendance.findOne({ userId, date });
    if (alreadyChecked) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    const attendance = await Attendance.create({
      userId,
      date,
      checkIn: new Date(),
    });

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Check-in failed", error });
  }
};

export const checkOut = async (req, res) => {
  const { attendanceId } = req.body;

  try {
    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) return res.status(404).json({ message: "Attendance not found" });

    attendance.checkOut = new Date();
    await attendance.save();

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Check-out failed", error });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: "Failed to get attendance" });
  }
};
