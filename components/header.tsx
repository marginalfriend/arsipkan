import Link from "next/link";
import AuthButton from "./auth-button";

export function Header() {
	return(
	<header className="flex flex-row w-screen items-center justify-between px-10 py-6">
		<div className="flex">
			<ul className="list-none flex gap-2">
				<li>
					<Link href={'/'}>
						<div className="p-2 hover:bg-slate-300 hover:cursor-pointer rounded-md hover:font-semibold">
							Home
						</div>
					</Link>
				</li>
				<li>
					<Link href={'/receipt'}>
						<div className="p-2 hover:bg-slate-300 hover:cursor-pointer rounded-md hover:font-semibold">
							Receipt
						</div>
					</Link>
				</li>
			</ul>
		</div>
		<AuthButton />
	</header>
	);
}