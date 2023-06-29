"use client";

import { Area } from "react-easy-crop/types";
import createImage from "./createImage";

export default async function cropImage(file: File, area: Area) : Promise<File | null> {
	// Creates the DOM Image
	const image = await createImage(file);

	// Creates a Canvas and Context
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext('2d');

	if(!ctx) return null;
	
	// Set canvas sizes to match the output image
	canvas.width = area.width;
	canvas.height = area.height;

	// Draw the image using the crop dimensions
	ctx?.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, area.width, area.height);
	
	// Convert the canvas image as a File
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			const file = new File([blob!], "name");
			resolve(file);
		}, "image/jpeg");
	});
}
