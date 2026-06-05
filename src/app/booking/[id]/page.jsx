import BookingDetailView from "@/components/booking/BookingDetailView";

export default async function BookingDetailPage({ params }) {
  const { id } = await params;

  return <BookingDetailView id={id} />;
}
