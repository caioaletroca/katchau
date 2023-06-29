"use client";

/**
 * Creates a DOM image using a File object as input
 * @param file File
 * @returns Promise<File>
 */
export default function createImage(file: File) : Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));
		image.src = URL.createObjectURL(file);
	});
}
