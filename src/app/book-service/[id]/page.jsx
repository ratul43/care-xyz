import BookingDetails from "@/components/booking/BookingDetails";

export default async function BookServicePage({ params }) {
  const { id } = await params;

  return <BookingDetails id={id} />;
}
