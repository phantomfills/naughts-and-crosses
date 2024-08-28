import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { Page, selectPage } from "shared/store/page";

interface PageProps extends React.PropsWithChildren {
	page: Page;
}

export function Page({ page, children }: PageProps) {
	const currentPage = useSelector(selectPage);
	if (currentPage !== page) return <></>;

	return <>{children}</>;
}
