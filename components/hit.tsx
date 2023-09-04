import {Highlight} from "react-instantsearch";

interface HitProps {
  hit: {
    image: string;
    name: string;
    description: string;
    price: number;
  };
}

const Hit: React.FC<HitProps> = ({hit}) => (
  <div className="flex flex-col bg-white shadow-md rounded-md overflow-hidden m-1">
    <img className="w-full h-64 object-cover" src="https://loremflickr.com/320/240/computers" alt={hit.name} />
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-700">
        <Highlight hit={hit} attribute="name" />
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        <Highlight hit={hit} attribute="description" />
      </p>
      <div className="mt-auto">
        <div className="font-bold text-gray-700 mt-4">${hit.price}</div>
      </div>
    </div>
  </div>
);

export default Hit;
