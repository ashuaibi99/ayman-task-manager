/* eslint-disable react/react-in-jsx-scope */
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

export default function ContactUs() {
    return (
        <div>
            <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Contact Details
            </h1>
            <Accordion type="single" collapsible className="w-96">
                <AccordionItem value="item-1">
                    <AccordionTrigger>CEO</AccordionTrigger>
                    <AccordionContent>
                        Bubby (that&apos;s his full name)
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Email</AccordionTrigger>
                    <AccordionContent>bubbymails@gmail.com</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Phone Number</AccordionTrigger>
                    <AccordionContent>1-800-BUB-CHUB</AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
