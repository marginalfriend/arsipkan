import React from 'react'
import ProjectTable from './components/ProjectTable'

function DashboardHomePage() {
	return (
		<main className='flex flex-col px-8 py-6'>
			<h1 className='font-bold text-3xl'>Tabel Projek</h1>
			<ProjectTable />
		</main>
	)
}

export default DashboardHomePage