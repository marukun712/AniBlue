import { Work } from "@types";

export default function CastList({ casts }: { casts: Work["casts"] }) {
  return (
    <ul className="grid grid-cols-2 gap-4">
      {casts.map((cast) => (
        <li key={cast.id} className="flex items-center space-x-2">
          <div>
            <p className="font-medium">{cast.name}</p>
            <p className="text-sm text-gray-500">{cast.character.name}役</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
