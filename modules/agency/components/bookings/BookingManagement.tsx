import { BookingStatus } from "../../types/booking.enum";
import {
  useFetchBookingDetails,
  useUpdateBookingStatus,
} from "../../hooks/use-booking";
import { Column, Table } from "@/shared/components/common/Table";
import { Booking } from "../../types/booking.type";

export const BookingManagement = () => {
  const { booking, setBooking } = useFetchBookingDetails();
  const { openConfirmModal, confirmStatusChange, modal, closeModal } = useUpdateBookingStatus(setBooking);
  const handleChangeStatus = async (bookingItem: Booking, status: BookingStatus) => {
    openConfirmModal(bookingItem as any, status);
  };
  const columns: Column<Booking>[] = [
    {
      header: "Booking Id",
      accessor: "id",
    },
    {
      header: "Customer name",
      accessor: "customer",
    },
    {
      header: "Destination",
      accessor: "destination",
    },
    {
      header: "Date",
      accessor: "date",
    },
    {
      header: "Total Cost",
      accessor: "budget",
    },
    {
      header: "Status",
      accessor: "status",
    },
    {
      header: "Actions",
      renderProps: (bookingItem: any) => (
        <div className="flex items-center space-x-2">
          <select
            value={bookingItem.status}
            onChange={(e) =>
              handleChangeStatus(bookingItem, e.target.value as BookingStatus)
            }
            className="border rounded px-2 py-1"
          >
            <option value={BookingStatus.PENDING}>Pending</option>
            <option value={BookingStatus.CONFIRMED}>Confirmed</option>
            <option value={BookingStatus.CANCELLED}>Cancelled</option>
            <option value={BookingStatus.COMPLETED}>Completed</option>
          </select>
        </div>
      ),
    },
  ];
  return (
    <Table<any>
      title="Booking Management"
      description="Manage Bookings"
      col={columns as any}
      data={booking as any}
    />
  );
};
