'use client'

import Link from "next/link";
import AuthButton from "./auth-button";

const routes = [
	{
		href: "/developer",
		label: "Developer",
	},
  {
    href: "/project",
    label: "Projek",
  },
  {
    href: "/receipt",
    label: "Kwitansi",
  },
];

export function Header() {

	return(
	<header className="flex flex-row w-full max-w-[100vw] items-center justify-between px-10 py-2 border-b mb-6">
		<div className="flex">
			<ul className="list-none flex gap-2">
				{
					routes.map((route) => {
						return (
							<li key={route.href}>
								<Link href={route.href}>
									<div className="p-2 hover:bg-slate-300 hover:cursor-pointer rounded-md font-semibold">
										{route.label}
									</div>
								</Link>
							</li>
						)
					})
				}
			</ul>
		</div>
		<span>{}</span>
		<AuthButton />
	</header>
	);
}