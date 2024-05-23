import { format } from "date-fns";
import { Table, Popover } from "flowbite-react";
import Link from "next/link";
import { HiOutlinePencilAlt, HiNewspaper } from "react-icons/hi";



export default function StudiesTab() {


    return (
        <>
            <div>
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>Last Name</Table.HeadCell>
                        <Table.HeadCell>First Name</Table.HeadCell>
                        <Table.HeadCell>Date Of Birth</Table.HeadCell>
                        <Table.HeadCell>Gender</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Accession</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                       

                    </Table.Body>
                </Table>
            </div>
        </>
    )
}