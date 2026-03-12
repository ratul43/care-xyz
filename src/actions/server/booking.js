

export const bookingsUser = async (data) => {

  const result = await dbConnect(collections.BOOKINGS).insertOne(data);

}