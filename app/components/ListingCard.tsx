import Image from "next/image";
import { useCountries } from "../lib/getCountries";
import Link from "next/link";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
}

export function ListingCard({
  description,
  imagePath,
  location,
  price,
}: iAppProps) {
  const { getCountriesByValue } = useCountries();
  const country = getCountriesByValue(location);

  return (
    <div className="flex flex-col ">
      <div className="relative h-72 ">
        <Image
          src={`https://nmiyqvoytwgkwzjevigo.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt={"Image of House"}
          fill
          className="rounded-lg h-full object-cover mb-3 "
        />
      </div>
      <Link href="">
        <h3 className=" text-base font-medium">
          {country?.flag}
          {country?.label}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground ">
          <span className="font-medium text-black">${price}</span> a Night
        </p>
      </Link>
    </div>
  );
}
