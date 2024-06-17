'use server'

import { promises as fs } from 'fs';
import path from 'path';
import { authenticate }  from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { auth, authOptions } from "@/auth"
import { getSession } from 'next-auth/react';
import { docs } from '@googleapis/docs';
import * as crypto from 'crypto';


export async function createNewDoc(title: string, accessToken: any) {
	const session = await auth()
	const token = session?.accessToken

	const reqBody = {
		"title": title
	}

	const response = await fetch('https://docs.googleapis.com/v1/documents', {
		headers: new Headers({
			"Authorization": "Bearer " + token
		}),
		method: 'POST',
		body: JSON.stringify(reqBody)
	})

	const result = await response.json()

	console.log(result)
}