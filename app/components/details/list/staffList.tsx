import { Work } from "@types";

export default function StaffList({ staffs }: { staffs: Work["staffs"] }) {
  return (
    <ul className="space-y-6">
      {staffs.map((staff) => (
        <li key={staff.id}>
          <span className="font-medium">{staff.role_text}:</span>
          {staff.name}
        </li>
      ))}
    </ul>
  );
}
